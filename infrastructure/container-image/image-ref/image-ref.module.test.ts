import { expect, test } from "bun:test"
import { authProxy } from "../dockerfiles/built-images/auth-proxy/auth-proxy.built-image.ts"
import { buildkit } from "../dockerfiles/built-images/buildkit/buildkit.built-image.ts"
import { REGISTRY, refFor, refOf, repositoryOf } from "./image-ref.module.code.ts"

test("a ref is the registry, the repository and the tag", () => {
  expect(refFor("infra/auth-proxy", "abc")).toBe(`${REGISTRY}/infra/auth-proxy:abc`)
})

test("the authenticating proxy is named at the repository its page states", () => {
  expect(repositoryOf(authProxy)).toBe("infra/auth-proxy")
})

test("the proxy's ref carries a twelve hex tag", () => {
  expect(refOf(authProxy)).toMatch(
    new RegExp(`^${REGISTRY.replaceAll(".", "\\.")}/infra/auth-proxy:[0-9a-f]{12}$`)
  )
})

test("an image stating no repository is refused", () => {
  expect(() => repositoryOf(buildkit)).toThrow("states no repository")
})
