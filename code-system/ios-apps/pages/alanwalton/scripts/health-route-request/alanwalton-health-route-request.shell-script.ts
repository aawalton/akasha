import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonHealthRouteRequest = {
  id: "01a0595b-ef5a-7421-8855-05d0d25560ac",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-health-route-request",
  definition: "the Swift encoding what the phone posts to a route and posting it",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A report reaches home from a run holding no credential.",
    },
    {
      invariantKind: "departure",
      statement: "A reported user id that is nothing is written as null rather than left out.",
    },
  ],
} as const satisfies ShellScript
