import type { Initiative } from "../initiative.page-type.ts"

export const athenaHarnessIntoAkasha = {
  id: "01a06210-e6f7-78af-9c1c-18a444bc8fbb",
  pageTypeSlug: "initiative",
  slug: "athena-harness-into-akasha",
  domainSlug: "domain/model",
  personaSlug: "athena",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement:
        "The model gateway is a domain in akasha, and every module it runs from is a page there.",
      workingMemory:
        "24 modules at akasha/agents/models/gateway/modules/<slug>/, 358 tests. A sibling import is ../<slug>/<slug>.module.code.ts. shape.ts is never ported: akasha carries zod, and z.looseObject rather than the deprecated .passthrough(). transport-log and observer-slot are in: rows go through page-entry-queue with the page file path handed in by the caller, so no index is read for a row. Day keying stays, the sweep reading a date. Left outside: oauth-effects gates 5, forward and gateway behind.",
    },
    {
      statement: "No part of the model gateway is outside akasha.",
      workingMemory:
        "Nine processes run from tools/lib/model-gateway/main.ts, spawned by supervisor-spawn-oauth-proxy.ts, which resolves the entrypoint relative to tools/lib through model-gateway-tree-version.ts:31 and can only ever spawn the old path; that resolution and the version stamp deciding when a supervisor respawns move first. pages-system-service is the precedent for running from a page, but it holds one fixed port where a gateway opens one per seat and a unix socket besides.",
    },
    {
      statement:
        "The supervisor is a domain in akasha, and every module it runs from is a page there.",
      workingMemory:
        "The supervisor runs from tools/run-supervisor.ts across 107 supervisor-* modules, a closure of 367 files. 166 of those are shared with the gateway closure of 209, and none of the shared files sit inside model-gateway/, so both ports run at once and the shared library is ported by whichever reaches it first. supervisor-spawn-oauth-proxy.ts is the seam: it spawns the gateway and resolves that entrypoint through model-gateway-tree-version.ts.",
    },
  ],
  constraints: [
    "The new gateway is built beside the old one, its users are moved to it, and only then is the old one removed.",
    "Every part of the gateway migrated into akasha lands under `akasha/agents/models`.",
    "The intent stack and its working memory hold where the work is, so a fresh context resumes from the page rather than from what it remembers.",
    "What is believed about the running system is measured before it is acted on, and a measurement that refutes the belief is reported as plainly as one that confirms it.",
    "Work never halts on doubt: a finding is filed, a decision is made, and the work goes on.",
    "Changes swarm across as many as twenty agents this initiative's persona spawns and shepherds, and the akasha commands are left to settle what collides.",
    "Every change goes through an akasha command, and a command that cannot do what is needed is enhanced or written rather than bypassed.",
    "A reminder every fifteen minutes restates these constraints and says to keep going.",
    "The gateway is recreated in the new paradigms rather than carried across, and a feature lost in the recreation is filed as a finding.",
    "The live gateway keeps serving while this work proceeds, and a change that would disturb it waits for a seat that can take the interruption.",
  ],
} as const satisfies Initiative
