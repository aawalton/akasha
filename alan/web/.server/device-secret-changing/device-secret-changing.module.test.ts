import { expect, test } from "bun:test"
import {
  mintDeviceSecret,
  revokeDeviceSecret,
} from "akasha/alan/web/.server/device-secret-changing/device-secret-changing.module.code.ts"

const A_DEVICE = "A1B2C3D4-E5F6-47B8-9C0D-1E2F3A4B5C6D"

test("a mint naming no contributor and no account mints nothing", async () => {
  const minted = await mintDeviceSecret({ deviceId: A_DEVICE })
  expect(minted.ok).toBe(false)
})

test("a mint naming a blank account reaches no person", async () => {
  const minted = await mintDeviceSecret({ deviceId: A_DEVICE, userId: "   " })
  expect(minted).toEqual({
    ok: false,
    why: "the call names neither a signed-in contributor nor an account, so it reaches no person",
  })
})

test("a revoke naming no contributor and no account revokes nothing", async () => {
  await expect(revokeDeviceSecret({ deviceId: A_DEVICE })).rejects.toThrow(
    "device-secrets revoke failed"
  )
})
