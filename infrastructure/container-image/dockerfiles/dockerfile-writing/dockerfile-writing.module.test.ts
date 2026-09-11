import { expect, test } from "bun:test"
import { dockerfileFor } from "akasha/infrastructure/container-image/dockerfiles/dockerfile-writing/dockerfile-writing.module.code.ts"

test("the Dockerfile written for the authenticating proxy runs what its extensions name", () => {
  const written = dockerfileFor("auth-proxy")
  expect(written).toContain("FROM oven/bun:1.3.14-alpine AS build")
  expect(written).toContain("EXPOSE 3080")
  expect(written).toContain(
    'CMD ["bun", "run", "infrastructure/networks/auth-proxy/server/auth-proxy-server.module.code.ts"]'
  )
})

test("the same call twice over writes the same Dockerfile", () => {
  expect(dockerfileFor("auth-proxy")).toBe(dockerfileFor("auth-proxy"))
})

test("a slug that is no built image is refused", () => {
  expect(() => dockerfileFor("nothing-here")).toThrow("is no built image")
})
