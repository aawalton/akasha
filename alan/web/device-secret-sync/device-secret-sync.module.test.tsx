import { beforeEach, expect, mock, test } from "bun:test"
import * as apiFetchModule from "@akasha/alanwalton-web/api-fetch"
import * as capacitorBridge from "@akasha/alanwalton-web/capacitor-bridge"
import { UserIdContext } from "@akasha/pages-ui/use-user-id"
import { render } from "@testing-library/react"
import { act } from "react"

let clearCount = 0
const apiCalls: string[] = []

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
  ...capacitorBridge,
  isNativeShell: () => true,
  getDeviceSecret: () => plugin,
}))

mock.module("@akasha/alanwalton-web/api-fetch", () => ({
  ...apiFetchModule,
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
