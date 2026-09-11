import { afterEach, beforeEach, expect, test } from "bun:test"
import {
  basicAuthHeader,
  getClientCredentials,
  getCredentials,
} from "akasha/alan/music/spotify/credentials/spotify-credentials.module.code.ts"

beforeEach(() => {
  process.env.SPOTIFY_CLIENT_ID = "an-id"
  process.env.SPOTIFY_CLIENT_SECRET = "a-secret"
  process.env.SPOTIFY_REDIRECT_URI = "https://example.invalid/callback"
})

afterEach(() => {
  delete process.env.SPOTIFY_CLIENT_ID
  delete process.env.SPOTIFY_CLIENT_SECRET
  delete process.env.SPOTIFY_REDIRECT_URI
})

test("the three secrets are read from the environment", () => {
  expect(getCredentials()).toEqual({
    clientId: "an-id",
    clientSecret: "a-secret",
    redirectUri: "https://example.invalid/callback",
  })
})

test("a secret the environment does not have throws", () => {
  delete process.env.SPOTIFY_CLIENT_SECRET
  expect(() => getCredentials()).toThrow("SPOTIFY_CLIENT_SECRET")
})

test("a redirect URI the environment does not have throws", () => {
  delete process.env.SPOTIFY_REDIRECT_URI
  expect(() => getCredentials()).toThrow("SPOTIFY_REDIRECT_URI")
})

test("each secret is read at the moment it is wanted", () => {
  process.env.SPOTIFY_CLIENT_ID = "a-later-id"
  expect(getClientCredentials().clientId).toBe("a-later-id")
})

test("the token endpoint is authorised by the client id and secret together", () => {
  expect(basicAuthHeader()).toBe(`Basic ${Buffer.from("an-id:a-secret").toString("base64")}`)
})

test("the header authorising the token endpoint asks for no redirect URI", () => {
  delete process.env.SPOTIFY_REDIRECT_URI
  expect(basicAuthHeader()).toBe(`Basic ${Buffer.from("an-id:a-secret").toString("base64")}`)
})
