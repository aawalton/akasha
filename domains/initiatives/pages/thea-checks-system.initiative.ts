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
        "Six are settled: a route's code is judged by nothing; a lualib page's `lua-export`, a computed property's `work` and a change guard's `runGuard` are spared by name; a command's code and a check's code keep the name made from their slug. What is left is a router app's own code files, which are no page's code — `root.tsx` holds `meta`, `Layout`, `ErrorBoundary`, `loader` and `links`, and `routes.ts` holds `routes`.",
    },
    {
      statement: "No module exports a value nothing names.",
      workingMemory:
        "874 refusals sit in `*.module.code.ts`, where no file imports the value and the file exporting it does not name it. These are the removal candidates, and none is removed before Alan settles it. `agents/models/modules/vocab/model-vocab.module.code.ts` exports `toDisplay`, `toWireId`, `isExtendedWire` and `stripExtendedWire`; `alan/harness/monarch/modules/files/monarch-files.module.code.ts` exports `DIRECTION_FOLDER`, `MERCHANT_FOLDER`, `directionPages`, `merchantPages` and `transactionsById`.",
    },
    {
      statement: "No file the broad unexport run left alone still publishes a value only it names.",
      workingMemory:
        "7 refusals over 5 files. `introduced-property-is-a-part`'s decision has a test red at HEAD from a regression in `pages/types/modules/declared-properties`, and holds three. `check-cost`, `code-tests`, `temper-inventory-plan` and `subagent-page-naming` hold one each and came after the run. The lualib shims and the atlas route files fell away once a lua export and a route's code stopped being judged.",
    },
    {
      statement: "Every uncommitted body beside a page exports the name that page's writer makes.",
      workingMemory:
        "6 `service-workstation` bodies still carry export names from before that page type was renamed. `pages/modules/uncommitted/page-uncommitted.module.code.ts` makes the name a writer uses now. Each is rewritten the next time its service writes, and most of the 24 first seen have cleared themselves that way.",
    },
  ],
  constraints: [
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
