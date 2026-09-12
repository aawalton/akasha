import { describe, expect, test } from "bun:test"
import { REFUSED } from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import {
  eventsIn,
  heldFor,
  inputAnew,
  judgedOf,
  reasonIn,
  type Valued,
} from "akasha/agents/hooks/dispatch/hook-dispatch.module.code.ts"

const OVER_BASH = "made-up/hooks/over-bash/over-bash.agent-hook.ts"

const OVER_READ = "made-up/hooks/over-read/over-read.agent-hook.ts"

const OVER_NONE = "made-up/hooks/over-none/over-none.agent-hook.ts"

const LISTED: readonly Valued[] = [
  { path: OVER_BASH, value: { slug: "over-bash", runsAt: ["PreToolUse"], overTools: ["Bash"] } },
  { path: OVER_READ, value: { slug: "over-read", runsAt: ["PreToolUse"], overTools: ["Read"] } },
  { path: OVER_NONE, value: { slug: "over-none", runsAt: ["SubagentStart", "SubagentStop"] } },
]

describe("eventsIn", () => {
  test("names every event any hook runs at, sorted", () => {
    expect(eventsIn(LISTED)).toEqual(["PreToolUse", "SubagentStart", "SubagentStop"])
  })
})

describe("heldFor", () => {
  test("keeps a hook over the tool the payload names", () => {
    expect(heldFor(LISTED, "PreToolUse", "Bash").map((one) => one.slug)).toEqual(["over-bash"])
  })

  test("drops a hook over another tool", () => {
    expect(heldFor(LISTED, "PreToolUse", "Read").map((one) => one.slug)).toEqual(["over-read"])
  })

  test("keeps a hook over no tool where the payload names none", () => {
    expect(heldFor(LISTED, "SubagentStop", null).map((one) => one.slug)).toEqual(["over-none"])
  })

  test("drops a hook over some tool where the payload names none", () => {
    expect(heldFor(LISTED, "PreToolUse", null)).toEqual([])
  })

  test("answers the code file beside the hook's page", () => {
    expect(heldFor(LISTED, "PreToolUse", "Bash")[0]?.at).toBe(
      "made-up/hooks/over-bash/over-bash.agent-hook.code.ts"
    )
  })

  test("refuses a page naming no slug", () => {
    const bad: readonly Valued[] = [{ path: OVER_BASH, value: { runsAt: ["Any"] } }]
    expect(() => heldFor(bad, "Any", null)).toThrow("naming no code a dispatch could run")
  })
})

describe("inputAnew", () => {
  test("answers the input a hook handed back", () => {
    const out = JSON.stringify({
      hookSpecificOutput: { hookEventName: "PreToolUse", updatedInput: { command: "ls" } },
    })
    expect(inputAnew(out)).toEqual({ command: "ls" })
  })

  test("answers nothing where a hook said nothing", () => {
    expect(inputAnew("")).toBe(null)
    expect(inputAnew(JSON.stringify({ decision: "block", reason: "no" }))).toBe(null)
  })
})

describe("reasonIn", () => {
  test("reads the reason a refusal carries", () => {
    const out = JSON.stringify({ decision: "block", reason: "because" })
    expect(reasonIn({ code: 2, out, err: "" })).toBe("because")
  })

  test("falls back to what the hook wrote to standard error", () => {
    expect(reasonIn({ code: 2, out: "", err: " broke \n" })).toBe("broke")
  })
})

describe("judgedOf", () => {
  test("answers nothing for a hook that judged and let the call through", () => {
    expect(judgedOf("over-bash", { code: 0, out: "", err: "" })).toBe(null)
  })

  test("answers the refusal a hook that refused carried", () => {
    const out = JSON.stringify({ decision: "block", reason: "because" })
    const said = judgedOf("over-bash", { code: 2, out, err: "" })
    expect(said?.code).toBe(REFUSED)
    expect(said?.err).toBe("because")
  })

  test("a hook exiting neither let-through nor refused refuses the call it judged", () => {
    const said = judgedOf("over-bash", { code: 5, out: "", err: "the payload would not parse\n" })
    expect(said?.code).toBe(REFUSED)
    expect(said?.err).toContain("`over-bash` exited 5")
    expect(said?.err).toContain("the payload would not parse")
    expect(said?.err).toContain("judging nothing")
  })

  test("every exit code but let-through refuses, whatever the hook wrote", () => {
    for (const code of [1, 3, 5, 127, -1]) {
      expect(judgedOf("over-bash", { code, out: "", err: "" })?.code).toBe(REFUSED)
    }
  })
})
