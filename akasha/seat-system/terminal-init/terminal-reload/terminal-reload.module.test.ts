import { describe, expect, test } from "bun:test"
import {
  COMPOSING,
  implName,
  launcher,
  RELOAD_FN,
  reloadFnLines,
} from "./terminal-reload.module.code.ts"

describe("a launcher", () => {
  test("is the name typed, calling the reload and then the definition it left", () => {
    expect(launcher("sn", "body")).toBe(
      ["sn() {", `  ${RELOAD_FN}`, '  _akasha_fn_sn "$@"', "}", "", "body"].join("\n")
    )
  })

  test("keeps what it does under a name of its own", () => {
    expect(implName("cu")).toBe("_akasha_fn_cu")
  })
})

describe("the reload", () => {
  const said = reloadFnLines().join("\n")

  test("composes the whole set again rather than the launcher that ran", () => {
    expect(COMPOSING).toBe("shell-init-bash")
    expect(said).toContain(`$_akasha_cli" ${COMPOSING}`)
  })

  test("parses the set before it loads the set", () => {
    expect(said.indexOf("bash -n")).toBeLessThan(said.indexOf('eval "$_akasha_text"'))
  })

  test("says which step of it failed", () => {
    for (const why of [
      "nothing to run at",
      "the command exited nonzero",
      "the command composed nothing",
      "the composed set does not parse",
      "the composed set would not load",
    ]) {
      expect(said).toContain(why)
    }
  })

  test("says what failed on the error stream and refuses", () => {
    expect(said).toContain('" >&2')
    expect(said).toContain("  return 1")
  })

  test("is one function bash can parse", async () => {
    const ran = Bun.spawn({ cmd: ["bash", "-n"], stdin: new TextEncoder().encode(said) })
    expect(await ran.exited).toBe(0)
  })
})
