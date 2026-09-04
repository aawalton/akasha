/**
 * The sign-out consequence, held in place.
 *
 * `DeviceSecretSync` is the only caller of the native `DeviceSecret.clear()`, and it reaches it
 * on exactly one edge: a render where `userID` is null preceded by a render where it was not.
 * Everything about how sign-out is written has to respect that edge, so it is asserted here
 * rather than left to be re-derived.
 *
 * The second test is the one with teeth. Sign-out used to end with
 * `window.location.href = "/sign-in"`, and a whole-document reload boots this component with no
 * earlier identity to compare against — the null-to-null case below. It never clears. That is
 * why a stale keychain item survived every sign-out on the phone, and why sign-out now drops the
 * identity on the live tree and moves by client-side navigation instead of reloading.
 */
import { beforeEach, expect, mock, test } from "bun:test"
import { UserIdContext } from "@akasha/pages-ui/use-user-id"
import { render } from "@testing-library/react"
import { act } from "react"

let clearCount = 0
const apiCalls: string[] = []

// `present` + the `pinned` domain is the "already stored where the widget can read it" answer,
// so the signed-in render settles on "skip" and the only store traffic these tests can see is
// the revoke that sign-out is supposed to send.
const plugin = {
  getDeviceId: () => Promise.resolve({ deviceId: "device-under-test" }),
  peek: () => Promise.resolve({ present: true, fingerprint: null, domain: "pinned" }),
  store: () => Promise.resolve({ domain: "pinned" }),
  clear: () => {
    clearCount += 1
    return Promise.resolve({ cleared: true })
  },
}

mock.module("@akasha/alanwalton-web/capacitor-bridge", () => ({
  isNativeShell: () => true,
  getDeviceSecret: () => plugin,
}))

mock.module("@akasha/alanwalton-web/api-fetch", () => ({
  apiFetch: (input: string) => {
    apiCalls.push(input)
    return Promise.resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }))
  },
}))

const { DeviceSecretSync } = await import("./device-secret-sync.module.code.tsx")

function Harness({ userID }: { userID: string | null }) {
  return (
    <UserIdContext value={userID}>
      <DeviceSecretSync />
    </UserIdContext>
  )
}

/** Lets the effect's async body settle; it is a short chain of already-resolved promises. */
async function settle(): Promise<void> {
  for (let i = 0; i < 10; i++) {
    await act(async () => {
      await Promise.resolve()
    })
  }
}

beforeEach(() => {
  clearCount = 0
  apiCalls.length = 0
})

test("an identity going null clears the on-device secret and asks the store to revoke it", async () => {
  const { rerender } = render(<Harness userID="user-under-test" />)
  await settle()
  expect(clearCount).toBe(0)

  rerender(<Harness userID={null} />)
  await settle()

  expect(clearCount).toBe(1)
  expect(apiCalls).toContain("/api/device-secret/revoke")
})

test("booting with no identity clears nothing, so sign-out cannot reload its way out", async () => {
  render(<Harness userID={null} />)
  await settle()

  expect(clearCount).toBe(0)
  expect(apiCalls).toEqual([])
})
