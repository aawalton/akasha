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
        "410 refusals sit in page code a runner loads by path, so the import index sees no importer: routes 174, lualib shims 123, commands 34, computed properties 34, change guards 11, check modules 11, manifests 6, type generators 6, readouts 5, model tests 3. `alan/atlas-web/routes.ts` names every route module as a string, and `pages/calculation-loading` reaches a computed property's `work` by name. The route page type already states a route is reached by a url rather than by importing it.",
    },
    {
      statement: "No module exports a value nothing names.",
      workingMemory:
        "873 refusals sit in `*.module.code.ts`, where no file imports the value and the file exporting it does not name it either. These are the removal candidates, and none is removed before Alan settles it. `agents/models/modules/vocab/model-vocab.module.code.ts` exports `toDisplay`, `toWireId`, `isExtendedWire` and `stripExtendedWire`; `alan/harness/monarch/files/monarch-files.module.code.ts` exports `DIRECTION_FOLDER`, `MERCHANT_FOLDER`, `directionPages`, `merchantPages` and `transactionsById`.",
    },
    {
      statement: "No file the broad unexport run left alone still publishes a value only it names.",
      workingMemory:
        "12 refusals over 10 files the run skipped, each held back by its own fault. The `atlas-map` and `atlas-trip` route code read `process.env.NEXT_PUBLIC_*`, which the ratchet refuses on any change touching them. `introduced-property-is-a-part`'s decision has a test red at HEAD from a regression in `pages/types/declared-properties`. Five lualib shims under `design/language/lua-compiler/lualibs` declare classes Biome calls unused once the `export` goes. `check-cost` and `code-tests` came later.",
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
