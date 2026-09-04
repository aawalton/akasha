import { describe, expect, test } from "bun:test"
import { sessionProjectDir } from "./supervisor-session-project-dir.module.code.ts"

describe("sessionProjectDir", () => {
  test("names the directory under the config directory it is handed", () => {
    expect(sessionProjectDir("/var/tmp", "/somewhere/.claude")).toBe(
      `/somewhere/.claude/projects/${require("node:fs").realpathSync("/var/tmp").replaceAll("/", "-")}`
    )
  })

  test("keeps a path it cannot resolve rather than throwing", () => {
    expect(sessionProjectDir("/no/such/path/here", "/c")).toBe("/c/projects/-no-such-path-here")
  })

  test("turns every separator in the path into a dash", () => {
    expect(sessionProjectDir("/a/b/c", "/c")).toBe("/c/projects/-a-b-c")
  })
})
