import { afterAll, describe, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { ASIDE, REFUSED } from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import {
  answerFor,
  asideOf,
  eventsIn,
  heldFor,
  hooksIn,
  inputAnew,
  judgedOf,
  reasonIn,
  type Valued,
} from "akasha/agent/hook/modules/dispatch/hook-dispatch.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { readingEnded } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"
import { readingFrom } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { indexAt } from "akasha/page/index/modules/surface/index-surface.module.code.ts"

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

const PAGE_TYPE = "page-type"

const HOOK_TYPE = "agent-hook"

const HELD_ID = "01a04e11-0000-7000-8000-000000000001"

const HELD_AT = join("hooks", "held", `held.${HOOK_TYPE}.ts`)

const pageOf = (slug: string): string =>
  `export const held = { id: "${HELD_ID}", slug: "${slug}", runsAt: ["PreToolUse"] }\n`

const scratch = scratchWorld()

afterAll(() => {
  readingEnded()
  scratch.sweep()
})

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-hook-dispatch-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

describe("hooksIn", () => {
  test("reads the hooks a commit holds rather than the ones the checkout holds", () => {
    const root = repoWith({
      [indexAt(PAGE_TYPE, HOOK_TYPE, "slug", "held.jsonl")]:
        `{"path":"${HELD_AT}","id":"${HELD_ID}"}\n`,
      [HELD_AT]: pageOf("held"),
    })
    writeFileSync(join(root, HELD_AT), pageOf("changed on disk"))
    const reading = readingFrom(root, "HEAD")
    expect(reading).not.toBeNull()
    expect(hooksIn(reading ?? root).map((one) => one.value["slug"])).toEqual(["held"])
    readingEnded()
  })

  test("reads the hooks the checkout holds where a root is handed in", () => {
    const root = repoWith({
      [indexAt(PAGE_TYPE, HOOK_TYPE, "slug", "held.jsonl")]:
        `{"path":"${HELD_AT}","id":"${HELD_ID}"}\n`,
      [HELD_AT]: pageOf("held"),
    })
    writeFileSync(join(root, HELD_AT), pageOf("changed on disk"))
    expect(hooksIn(root).map((one) => one.value["slug"])).toEqual(["changed on disk"])
  })
})

describe("answerFor", () => {
  test("passes a call where the index names no hook, and says why", async () => {
    const root = repoWith({
      [indexAt(PAGE_TYPE, "module", "slug", "held.jsonl")]:
        `{"path":"${HELD_AT}","id":"${HELD_ID}"}\n`,
      [HELD_AT]: pageOf("held"),
    })
    const reading = readingFrom(root, "HEAD")
    expect(reading).not.toBeNull()
    const said = await answerFor(root, reading ?? readingIn(root), {
      hook_event_name: "PreToolUse",
    })
    expect(said.code).toBe(ASIDE)
    expect(said.out).toBe("")
    expect(said.err).toContain(`names no \`${HOOK_TYPE}\``)
    readingEnded()
  })
})

describe("judgedOf", () => {
  test("answers nothing for a hook that judged and let the call through", () => {
    expect(judgedOf({ code: 0, out: "", err: "" })).toBe(null)
  })

  test("answers the refusal a hook that refused carried", () => {
    const out = JSON.stringify({ decision: "block", reason: "because" })
    const said = judgedOf({ code: 2, out, err: "" })
    expect(said?.code).toBe(REFUSED)
    expect(said?.err).toBe("because")
  })

  test("every exit code but refused passes, whatever the hook wrote", () => {
    for (const code of [0, 1, 3, 5, 127, -1]) {
      expect(judgedOf({ code, out: "", err: "" })).toBe(null)
    }
  })
})

describe("asideOf", () => {
  test("says why a hook exiting neither let-through nor refused judged nothing", () => {
    const why = asideOf("over-bash", { code: 5, out: "", err: "the payload would not parse\n" })
    expect(why).toContain("`over-bash` exited 5")
    expect(why).toContain("the payload would not parse")
    expect(why).toContain("judging nothing")
  })

  test("says nothing of a hook that let the call through or refused it", () => {
    expect(asideOf("over-bash", { code: 0, out: "", err: "" })).toBe(null)
    expect(asideOf("over-bash", { code: 2, out: "", err: "no" })).toBe(null)
  })
})
