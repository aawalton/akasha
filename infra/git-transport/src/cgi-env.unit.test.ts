import { describe, expect, test } from "bun:test"
import { backendEnv } from "./cgi-env"

const REQUEST = {
  pathInfo: "/alan/akasha.git/git-receive-pack",
  queryString: "",
  remoteUser: "alan",
  method: "POST",
  contentType: "application/x-git-receive-pack-request",
  contentLength: "4213",
  isGzip: false,
} as const

const KEYS_WITHOUT_CREDENTIAL = [
  "CONTENT_LENGTH",
  "CONTENT_TYPE",
  "GIT_HTTP_EXPORT_ALL",
  "GIT_PROJECT_ROOT",
  "GIT_TRANSPORT_PORT",
  "PATH_INFO",
  "PATH",
  "QUERY_STRING",
  "REMOTE_USER",
  "REQUEST_METHOD",
  "SERVER_PROTOCOL",
].sort()

describe("backendEnv", () => {
  test("hands the backend exactly the keys it is meant to see", () => {
    const env = backendEnv({ ...REQUEST, processEnv: {} })
    expect(Object.keys(env).sort()).toEqual(KEYS_WITHOUT_CREDENTIAL)
  })

  test("a pod-level mirror destination in the environment does not reach a hook", () => {
    const destination = "https://github.com/audhdalan/akasha.git"
    const env = backendEnv({
      ...REQUEST,
      processEnv: { GITHUB_MIRROR_URL: destination, MIRROR_URL: destination },
    })
    expect(Object.keys(env).sort()).toEqual(KEYS_WITHOUT_CREDENTIAL)
    expect(Object.values(env)).not.toContain(destination)
  })

  test("forwards the mirror credential, which stays pod-level", () => {
    const env = backendEnv({ ...REQUEST, processEnv: { GITHUB_ACCESS_TOKEN: "tok" } })
    expect(env.GITHUB_ACCESS_TOKEN).toBe("tok")
    expect(Object.keys(env).sort()).toEqual(
      [...KEYS_WITHOUT_CREDENTIAL, "GITHUB_ACCESS_TOKEN"].sort()
    )
  })

  test("omits the credential key entirely when it is unset", () => {
    const env = backendEnv({ ...REQUEST, processEnv: {} })
    expect(env).not.toHaveProperty("GITHUB_ACCESS_TOKEN")
  })

  test("clears CONTENT_LENGTH for a gzipped body so the backend reads to EOF", () => {
    const env = backendEnv({ ...REQUEST, isGzip: true, processEnv: {} })
    expect(env.CONTENT_LENGTH).toBe("")
  })

  test("passes the request through unaltered", () => {
    const env = backendEnv({ ...REQUEST, processEnv: { PATH: "/opt/bin" } })
    expect(env.PATH_INFO).toBe(REQUEST.pathInfo)
    expect(env.REQUEST_METHOD).toBe("POST")
    expect(env.REMOTE_USER).toBe("alan")
    expect(env.CONTENT_LENGTH).toBe("4213")
    expect(env.PATH).toBe("/opt/bin")
  })

  test("falls back to a usable PATH when the process has none", () => {
    const env = backendEnv({ ...REQUEST, processEnv: {} })
    expect(env.PATH).toContain("/usr/bin")
  })
})
