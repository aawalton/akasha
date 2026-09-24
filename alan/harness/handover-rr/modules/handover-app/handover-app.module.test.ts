import { expect, test } from "bun:test"
import {
  APP_AUDIENCE,
  APP_MINT_PATH,
  appLandingAt,
  appMintingAt,
  challengeShown,
} from "akasha/alan/harness/handover-rr/modules/handover-app/handover-app.module.code.ts"
import { alanwalton } from "akasha/code/ios-app/pages/alanwalton/alanwalton.ios-app.ts"

const A_CHALLENGE = "ungWv48Bz-pBQUDeXa4iI7ADYaOWF3qctBD_YfIAFa0"

test("the app is named by the bundle id its page states", () => {
  expect(APP_AUDIENCE).toBe(alanwalton.bundleId)
})

test("a challenge of forty-three base64url characters is taken whole", () => {
  expect(challengeShown(A_CHALLENGE)).toBe(A_CHALLENGE)
})

test("anything of another shape is no challenge", () => {
  expect(challengeShown(null)).toBe(null)
  expect(challengeShown("")).toBe(null)
  expect(challengeShown(`${A_CHALLENGE}a`)).toBe(null)
  expect(challengeShown(A_CHALLENGE.slice(1))).toBe(null)
  expect(challengeShown(`${A_CHALLENGE.slice(0, 42)}+`)).toBe(null)
  expect(challengeShown(`${A_CHALLENGE.slice(0, 42)}=`)).toBe(null)
})

test("a code goes to the app over the app's own url scheme", () => {
  expect(appLandingAt("a.b.c")).toBe("alanwalton://handover?code=a.b.c")
})

test("the mint a signed-out reader comes back to carries the challenge", () => {
  expect(appMintingAt(A_CHALLENGE)).toBe(`${APP_MINT_PATH}?challenge=${A_CHALLENGE}`)
})
