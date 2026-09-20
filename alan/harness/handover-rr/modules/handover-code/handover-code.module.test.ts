import { expect, test } from "bun:test"
import {
  CHALLENGE_CLAIM,
  CODE_SECONDS_CEILING,
  challengeFor,
  contributorInCode,
  HANDOVER_ISSUER,
  handoverCodeFor,
} from "akasha/alan/harness/handover-rr/modules/handover-code/handover-code.module.code.ts"
import { decodeJwt, exportPKCS8, exportSPKI, generateKeyPair } from "jose"

const AUDIENCE = "com.alanwalton.app"

const ANOTHER_AUDIENCE = "https://tempereso.com"

const CONTRIBUTOR = "contributor-one"

const A_VERIFIER = "a-secret-the-app-keeps-and-never-sends"

const ANOTHER_VERIFIER = "a-secret-a-thief-made-up"

const pair = await generateKeyPair("EdDSA", { crv: "Ed25519", extractable: true })

process.env.HANDOVER_SIGNING_KEY = await exportPKCS8(pair.privateKey)

process.env.HANDOVER_PUBLIC_KEY = await exportSPKI(pair.publicKey)

test("the hash of a verifier is forty-three base64url characters", async () => {
  expect(await challengeFor("abc")).toBe("ungWv48Bz-pBQUDeXa4iI7ADYaOWF3qctBD_YfIAFa0")
})

test("a code for the app names the audience, the contributor and the hash", async () => {
  const challenge = await challengeFor(A_VERIFIER)
  const code = await handoverCodeFor({ audience: AUDIENCE, contributor: CONTRIBUTOR, challenge })
  const claims = decodeJwt(code)
  expect(claims.iss).toBe(HANDOVER_ISSUER)
  expect(claims.aud).toBe(AUDIENCE)
  expect(claims.sub).toBe(CONTRIBUTOR)
  expect(claims[CHALLENGE_CLAIM]).toBe(challenge)
  expect(Number(claims.exp) - Number(claims.iat)).toBeLessThanOrEqual(CODE_SECONDS_CEILING)
})

test("no code carries the verifier the hash was taken of", async () => {
  const challenge = await challengeFor(A_VERIFIER)
  const code = await handoverCodeFor({ audience: AUDIENCE, contributor: CONTRIBUTOR, challenge })
  expect(code).not.toContain(A_VERIFIER)
})

test("a code carrying a hash reads where the verifier shown hashes to it", async () => {
  const challenge = await challengeFor(A_VERIFIER)
  const code = await handoverCodeFor({ audience: AUDIENCE, contributor: CONTRIBUTOR, challenge })
  expect(await contributorInCode({ code, audience: AUDIENCE, verifier: A_VERIFIER })).toBe(
    CONTRIBUTOR
  )
})

test("a code carrying a hash reads as nobody where another verifier is shown", async () => {
  const challenge = await challengeFor(A_VERIFIER)
  const code = await handoverCodeFor({ audience: AUDIENCE, contributor: CONTRIBUTOR, challenge })
  expect(await contributorInCode({ code, audience: AUDIENCE, verifier: ANOTHER_VERIFIER })).toBe(
    null
  )
})

test("a code carrying a hash reads as nobody where no verifier is shown", async () => {
  const challenge = await challengeFor(A_VERIFIER)
  const code = await handoverCodeFor({ audience: AUDIENCE, contributor: CONTRIBUTOR, challenge })
  expect(await contributorInCode({ code, audience: AUDIENCE, verifier: null })).toBe(null)
})

test("a code carrying no hash reads where no verifier is shown", async () => {
  const code = await handoverCodeFor({
    audience: ANOTHER_AUDIENCE,
    contributor: CONTRIBUTOR,
    challenge: null,
  })
  expect(await contributorInCode({ code, audience: ANOTHER_AUDIENCE, verifier: null })).toBe(
    CONTRIBUTOR
  )
})

test("a code carrying no hash reads as nobody where a verifier is shown", async () => {
  const code = await handoverCodeFor({
    audience: ANOTHER_AUDIENCE,
    contributor: CONTRIBUTOR,
    challenge: null,
  })
  expect(await contributorInCode({ code, audience: ANOTHER_AUDIENCE, verifier: A_VERIFIER })).toBe(
    null
  )
})

test("a code for the app reads as nobody at another audience", async () => {
  const challenge = await challengeFor(A_VERIFIER)
  const code = await handoverCodeFor({ audience: AUDIENCE, contributor: CONTRIBUTOR, challenge })
  expect(await contributorInCode({ code, audience: ANOTHER_AUDIENCE, verifier: A_VERIFIER })).toBe(
    null
  )
})
