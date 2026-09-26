import { expect, test } from "bun:test"
import { runRecipientResolverTick } from "akasha/agent/message/recipient-resolving/modules/recipient-resolver-tick/recipient-resolver-tick.module.code.ts"
import type { RecipientResolverTickDeps } from "akasha/agent/message/recipient-resolving/modules/recipient-resolver-tick-deps/recipient-resolver-tick-deps.module.code.ts"
import type {
  CommsInput,
  FirstStart,
  OnDemandAgentSpec,
} from "akasha/agent/message/recipient-resolving/modules/seat-wake-rules/seat-wake-rules.module.code.ts"
import { ACTION_BAR_SENDER } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"

const SEAT = "mari-game-master-the-dating-game"

const START: FirstStart = {
  persona: "mari",
  role: "game-master",
  domain: "the-dating-game",
  principal: "alan",
}

const FROM_THE_BAR: CommsInput = { sender: `agent:${ACTION_BAR_SENDER}`, content: "I say hello" }

function specWith(firstStart: FirstStart | null): OnDemandAgentSpec {
  const spec: OnDemandAgentSpec = {
    name: SEAT,
    wakeSources: [
      {
        id: `${SEAT}-action-bar`,
        senderMatch: `agent:${ACTION_BAR_SENDER}`,
        contentRegex: undefined,
        target: SEAT,
        status: "LIVE",
      },
    ],
    stateAuthority: [],
    resumePolicy: { kind: "fresh" },
    owner: "awen",
  }
  return firstStart === null ? spec : { ...spec, firstStart }
}

function ranWith(spec: OnDemandAgentSpec, over: Partial<RecipientResolverTickDeps> = {}) {
  const started: { readonly name: string; readonly as: FirstStart }[] = []
  const revived: string[] = []
  const deps: RecipientResolverTickDeps = {
    specs: [spec],
    resolveAgent: async () => null,
    readInbound: async () => [FROM_THE_BAR],
    readInboundTo: async () => [FROM_THE_BAR],
    startFirst: async (name, as) => {
      started.push({ name, as })
    },
    revive: async (agentId) => {
      revived.push(agentId)
      return "revived"
    },
    reportUnrevivable: async () => undefined,
    seatIsPresent: async () => false,
    signal: new AbortController().signal,
    ...over,
  }
  return { deps, started, revived }
}

test("a game master that never ran is started as its spec says when an action waits for it", async () => {
  const { deps, started, revived } = ranWith(specWith(START))
  await runRecipientResolverTick(deps)
  expect(started).toEqual([{ name: SEAT, as: START }])
  expect(revived).toEqual([])
})

test("a seat that never ran is left where nothing it answers to waits for it", async () => {
  const { deps, started } = ranWith(specWith(START), {
    readInboundTo: async () => [{ sender: "agent:someone-else", content: "hi" }],
  })
  await runRecipientResolverTick(deps)
  expect(started).toEqual([])
})

test("a seat that never ran is left where its spec says nothing of how to start it", async () => {
  const { deps, started } = ranWith(specWith(null))
  await runRecipientResolverTick(deps)
  expect(started).toEqual([])
})

test("a seat that ran before is revived rather than started again", async () => {
  const { deps, started, revived } = ranWith(specWith(START), {
    resolveAgent: async () => ({ id: "agent-one" }),
  })
  await runRecipientResolverTick(deps)
  expect(revived).toEqual(["agent-one"])
  expect(started).toEqual([])
})
