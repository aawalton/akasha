import type { Initiative } from "../initiative.page-type.ts"

export const athenaModelGatewayIntoAkasha = {
  id: "01a06210-e6f7-78af-9c1c-18a444bc8fbb",
  pageTypeSlug: "initiative",
  slug: "athena-model-gateway-into-akasha",
  domainSlug: "models",
  personaSlug: "athena",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement:
        "The gateway reads a request body once and needs no validator outside akasha to do it.",
      workingMemory:
        "Two full-body passes run on every POST: parseClientStreamFlag at pre-forward-queue.ts:25 and isFableRequest at pick-pipeline.ts:36, each parsing the whole buffer for one scalar. Three more parse behind upstream 400, 404 and 429. Measured: 2.37ms at 2MB, 7.57ms at 8MB, linear at 1.2 to 1.8 ms per MB. Bodies are 370KB median and 1.19MB at p95 over 569,546 requests, so the pipeline costs 1.4ms at p95 and does not explain the stall it was suspected of.",
    },
    {
      statement:
        "The gateway reads accounts from claude-account pages rather than from the old oauth files.",
      workingMemory:
        "akasha/agents-system/claude-account already carries access-token, refresh-token, scopes, rate-limit-tier, retry-allowed-at, the five-hour and seven-day windows and terminal-at, with eight accounts as pages and secrets in uncommitted siblings. The gateway still reads tools/lib/oauth-types.ts from ten of its modules. oauth-types has 21 importers repo-wide, so the old files remain until the other readers move.",
    },
    {
      statement:
        "The gateway emits a transport event to a sink it is given rather than writing seat log pages itself.",
      workingMemory:
        "The closure from main.ts is 208 files, of which 39 are the gateway and 169 are reached through logging and seat naming alone: transport-log.ts and main.ts reach log-append.ts, which pulls the whole page system in through rowAppender. Nothing in pick-pipeline, forward, retry, message-handler or the body modules touches a page. Cutting the sink collapses the closure to about 40 files and is what makes the gateway testable at all.",
    },
    {
      statement: "Every module of the gateway is a page under akasha with a test.",
      workingMemory:
        "39 files become module folders, each with a page stating its definition, a v7 id, invariants and a test. The rules touching nearly every line are upper snake case constants, no non-null assertion, no void return, exhaustive dispatch, an explicit .ts on relative imports, and a 15000 byte ceiling the largest file at 9393 already clears. The comments at transport-log.ts:206 and page-rows-write.ts:331 record why two earlier fixes exist.",
    },
    {
      statement: "The gateway runs from its own page.",
      workingMemory:
        "pages-system-service.workstation-service.ts is the precedent: a Bun.serve daemon declaring runs, enabled, port and binds, read off its own page at start rather than hardcoded, installed by akasha service install. The gateway differs in opening a port per seat rather than one fixed port, and in holding a unix socket for remote control, so how a per-seat service states its port is the open question this intent answers.",
    },
    {
      statement: "Nothing runs from tools/lib/model-gateway and the folder is gone.",
      workingMemory:
        "Nine gateway processes run from tools/lib/model-gateway/main.ts today, spawned by supervisor-spawn-oauth-proxy.ts, which resolves the entrypoint relative to tools/lib through model-gateway-tree-version.ts:31 and can therefore only ever spawn the old path. That resolution and the version stamp deciding when a supervisor respawns are what have to move before the folder can go.",
    },
  ],
  constraints: [
    "The new gateway is built beside the old one, its users are moved to it, and only then is the old one removed.",
    "The intent stack and its working memory hold where the work is, so a fresh context resumes from the page rather than from what it remembers.",
    "What is believed about the running system is measured before it is acted on, and a measurement that refutes the belief is reported as plainly as one that confirms it.",
    "The live gateway keeps serving while this work proceeds, and a change that would disturb it waits for a seat that can take the interruption.",
  ],
} as const satisfies Initiative
