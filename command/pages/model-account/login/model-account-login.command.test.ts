import { expect, test } from "bun:test"
import {
  DATA,
  INPUT,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  addressIn,
  codeTaken,
  type Doors,
  endedIn,
  modelAccountLogin,
  POLL_MS,
  SIGN_IN,
  SIGN_IN_MAX_SECONDS,
  saidIn,
  scopedOf,
  sessionOf,
  started,
} from "akasha/command/pages/model-account/login/model-account-login.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha model-account login",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const ADDRESS = "https://claude.com/cai/oauth/authorize?code=true&client_id=an-id&state=a-state"

const ASKING = `Opening browser to sign in…\nIf the browser didn't open, visit: ${ADDRESS}\nPaste code here if prompted >`

const CODE = "the-code-abc123"

type Held = {
  live: boolean
  pane: string
  afterStart: string
  afterCode: string
  calls: string[][]
  opened: string[]
  pushed: number
  pushRefused: boolean
}

function heldWith(over: Partial<Held>): Held {
  return {
    live: false,
    pane: "",
    afterStart: ASKING,
    afterCode: `${ASKING} ${CODE}\nLogin successful.\nakasha-login-ended 0`,
    calls: [],
    opened: [],
    pushed: 0,
    pushRefused: false,
    ...over,
  }
}

function doorsOver(held: Held): Doors {
  let clock = 0
  const tmux = (args: readonly string[]) => {
    held.calls.push([...args])
    const act = args[0]
    if (act === "has-session") return Promise.resolve({ code: held.live ? 0 : 1, out: "" })
    if (act === "new-session") {
      held.live = true
      held.pane = held.afterStart
    }
    if (act === "capture-pane") return Promise.resolve({ code: 0, out: held.pane })
    if (act === "send-keys" && args.includes("Enter")) held.pane = held.afterCode
    if (act === "kill-session") held.live = false
    return Promise.resolve({ code: 0, out: "" })
  }
  return {
    tmux,
    opened: (slug, args) => {
      held.opened.push(slug)
      return tmux(args)
    },
    waited: () => Promise.resolve(),
    now: () => {
      clock += POLL_MS
      return clock
    },
    known: (slug) => slug === "an-account",
    dirOf: (slug) => `/accounts/${slug}`,
    pushed: () => {
      held.pushed += 1
      return held.pushRefused
        ? Promise.reject(new Error("a credential of another person"))
        : Promise.resolve()
    },
    status: () => Promise.resolve(["loggedIn: true"]),
  }
}

function actsOf(held: Held): readonly string[] {
  return held.calls.map((one) => one[0] ?? "")
}

test("the address is found in a pane, and a pane without one answers none", () => {
  expect(addressIn(ASKING)).toBe(ADDRESS)
  expect(addressIn("Opening browser to sign in…")).toBeNull()
})

test("the ending mark carries the sign-in's exit, and a pane without it answers none", () => {
  expect(endedIn("akasha-login-ended 1")).toBe(1)
  expect(endedIn(ASKING)).toBeNull()
})

test("what a pane said leaves out the address, the ending mark and the code", () => {
  const said = saidIn(`${ASKING} ${CODE}\nLogin failed.\nakasha-login-ended 1`, CODE)
  expect(said).toEqual(["Opening browser to sign in…", "Login failed."])
})

test("a first call opens a session running the sign-in against the account's folder", async () => {
  const held = heldWith({})
  const said = await started("an-account", "/accounts/an-account", doorsOver(held))
  const opened = held.calls.find((one) => one[0] === "new-session") ?? []
  expect(opened).toContain(sessionOf("an-account"))
  expect(opened).toContain(SIGN_IN)
  expect(opened[opened.length - 1]).toBe("/accounts/an-account")
  expect(held.opened).toEqual(["an-account"])
  expect(said.code).toBe(0)
  expect(said.report).toContain(ADDRESS)
  expect(held.live).toBe(true)
})

test("a sign-in runs in a scope of its own, ended at its ceiling", () => {
  const argv = scopedOf("an-account", 7, ["tmux", "new-session"])
  expect(argv.slice(0, 3)).toEqual(["systemd-run", "--user", "--scope"])
  expect(argv).toContain("--unit=model-account-login-an-account-7")
  expect(argv).toContain(`RuntimeMaxSec=${String(SIGN_IN_MAX_SECONDS)}`)
  expect(argv.slice(-2)).toEqual(["tmux", "new-session"])
})

test("a first call finding a sign-in waiting answers its address and opens none", async () => {
  const held = heldWith({ live: true, pane: ASKING })
  const said = await started("an-account", "/accounts/an-account", doorsOver(held))
  expect(actsOf(held)).not.toContain("new-session")
  expect(said.report).toContain(ADDRESS)
})

test("a sign-in ending before any address is refused and its session goes", async () => {
  const held = heldWith({ afterStart: "Something broke.\nakasha-login-ended 1" })
  const said = await started("an-account", "/accounts/an-account", doorsOver(held))
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals).toContain("Something broke.")
  expect(held.live).toBe(false)
})

test("a code with no sign-in waiting is refused as a fault of the data", async () => {
  const held = heldWith({})
  const said = await codeTaken("an-account", "/accounts/an-account", CODE, doorsOver(held))
  expect(said.code).toBe(DATA)
  expect(actsOf(held)).not.toContain("send-keys")
})

test("a code is typed as it was given, then entered, and a landing pushes and closes", async () => {
  const held = heldWith({ live: true, pane: ASKING })
  const said = await codeTaken("an-account", "/accounts/an-account", CODE, doorsOver(held))
  const sent = held.calls.filter((one) => one[0] === "send-keys")
  expect(sent[0]).toEqual(["send-keys", "-t", sessionOf("an-account"), "-l", CODE])
  expect(sent[1]).toEqual(["send-keys", "-t", sessionOf("an-account"), "Enter"])
  expect(said.code).toBe(0)
  expect(held.pushed).toBe(1)
  expect(said.report).toContain("loggedIn: true")
  expect(said.report.join("\n")).not.toContain(CODE)
  expect(held.live).toBe(false)
})

test("a sign-in ending at anything but zero is refused, and nothing is pushed", async () => {
  const held = heldWith({
    live: true,
    pane: ASKING,
    afterCode: `${ASKING} ${CODE}\nInvalid code.\nakasha-login-ended 1`,
  })
  const said = await codeTaken("an-account", "/accounts/an-account", CODE, doorsOver(held))
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals).toContain("Invalid code.")
  expect(said.refusals.join("\n")).not.toContain(CODE)
  expect(held.pushed).toBe(0)
  expect(held.live).toBe(false)
})

test("a push the page refuses is refused, the session gone all the same", async () => {
  const held = heldWith({ live: true, pane: ASKING, pushRefused: true })
  const said = await codeTaken("an-account", "/accounts/an-account", CODE, doorsOver(held))
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals.join("\n")).toContain("another person")
  expect(held.live).toBe(false)
})

test("an account no page is filed for is refused before any session opens", async () => {
  const held = heldWith({})
  const said = await modelAccountLogin(["--account", "no-such-account"], GIVEN, () =>
    doorsOver(held)
  )
  expect(said.code).toBe(DATA)
  expect(held.calls).toEqual([])
})

test("a call naming no account is refused as a fault of the input", async () => {
  const said = await modelAccountLogin([], GIVEN)
  expect(said.code).toBe(INPUT)
})
