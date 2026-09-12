import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  type: "initiative",
  slug: "thea-checks-system",
  domain: "domain/check",
  persona: "thea",
  intents: [
    {
      statement: "The check passes over a value a runner reaches by path rather than by import.",
      workingMemory:
        "233 refusals sit in page code a runner loads by path, so the import index sees no importer: lualib shims 123, commands 34, computed properties 34, change guards 11, check modules 11, manifests 6, type generators 6, readouts 5, model tests 3. `pages/modules/calculation-loading` reaches a computed property's `work` by name. Routes were settled first: a route's code is judged by nothing, since an `app-routes` page names the route and a url reaches it.",
    },
    {
      statement: "No module exports a value nothing names.",
      workingMemory:
        "874 refusals sit in `*.module.code.ts`, where no file imports the value and the file exporting it does not name it either. These are the removal candidates, and none is removed before Alan settles it. `agents/models/modules/vocab/model-vocab.module.code.ts` exports `toDisplay`, `toWireId`, `isExtendedWire` and `stripExtendedWire`; `alan/harness/monarch/files/monarch-files.module.code.ts` exports `DIRECTION_FOLDER`, `MERCHANT_FOLDER`, `directionPages`, `merchantPages` and `transactionsById`.",
    },
    {
      statement: "No file the broad unexport run left alone still publishes a value only it names.",
      workingMemory:
        "10 refusals over 8 files the run skipped, each held back by its own fault. `introduced-property-is-a-part`'s decision has a test red at HEAD from a regression in `pages/types/declared-properties`. Five lualib shims under `design/language/lua-compiler/lualibs` declare classes Biome calls unused once the `export` goes. `check-cost` and `code-tests` came later. The two atlas route files fell away once a route's code stopped being judged.",
    },
    {
      statement: "Every uncommitted body beside a page exports the name that page's writer makes.",
      workingMemory:
        "24 `service-workstation` bodies carry export names from before that page type was renamed. `alan/harness/inboxes/relay-service/inbox-relay-service.service-workstation.uncommitted.ts` exports `inboxRelayServiceWorkstationServiceUncommitted` where `pages/uncommitted/page-uncommitted.module.code.ts` now makes `inboxRelayServiceServiceWorkstationUncommitted`. Each is rewritten the next time its service writes, so this may clear itself.",
    },
  ],
  constraints: [
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
