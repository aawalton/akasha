import type { Initiative } from "../initiative.page-type.ts"

export const athenaModelGatewayIntoAkasha = {
  id: "01a06210-e6f7-78af-9c1c-18a444bc8fbb",
  pageTypeSlug: "initiative",
  slug: "athena-model-gateway-into-akasha",
  domainSlug: "domain/models",
  personaSlug: "athena",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement:
        "The model gateway is a domain in akasha, and every module it runs from is a page there.",
      workingMemory:
        "model-gateway is a domain under models, and keepalive is the first module in with 6 tests passing. Nine modules import nothing at all and go first: sse-error-frame, committed-outcome, bind-with-retry, hold-registry, proxy-headers, queue-step, keepalive, idle-timeout, capacity-classification. Cutting the log sink collapses the 208-file closure from main.ts to about 40. Checks that bite: UPPER_SNAKE constants, lowerCamel functions, no cast through unknown, and `stand` is a taboo term.",
    },
    {
      statement: "No part of the model gateway is outside akasha.",
      workingMemory:
        "Nine processes run from tools/lib/model-gateway/main.ts, spawned by supervisor-spawn-oauth-proxy.ts, which resolves the entrypoint relative to tools/lib through model-gateway-tree-version.ts:31 and can only ever spawn the old path; that resolution and the version stamp deciding when a supervisor respawns move first. pages-system-service is the precedent for running from a page, but it holds one fixed port where a gateway opens one per seat and a unix socket besides.",
    },
  ],
  constraints: [
    "The new gateway is built beside the old one, its users are moved to it, and only then is the old one removed.",
    "Every part of the gateway migrated into akasha lands under `akasha/agents-system/models`.",
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
