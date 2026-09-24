import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCapture = {
  id: "01a0c484-032b-7be6-872e-9c0e427a6e48",
  type: "page-type/domain",
  slug: "temper-capture",
  definition: "what an add-on writes out of the game, and what reads it back",
  parts: [
    "domain/temper-capture-shape",
    "domain/temper-capture-writer",
    "domain/temper-capture-error",
    "domain/temper-capture-sale",
    "domain/temper-capture-datamining",
    "domain/temper-game-catalog-capture-addon",
    "domain/temper-characters-capture-addon",
    "domain/temper-characters-skills-morphs-addon",
    "domain/temper-completion-import",
    "domain/temper-errors-triage",
  ],
} as const satisfies Domain
