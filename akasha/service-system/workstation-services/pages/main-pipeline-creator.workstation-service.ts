import type { WorkstationService } from "../workstation-service.page-type.ts"

export const mainPipelineCreator = {
  id: "01a06829-0194-7bda-8eac-ca7349b6d06e",
  pageTypeSlug: "workstation-service",
  slug: "main-pipeline-creator",
  definition: "the service giving every commit landing on main its pipeline",
  runs: ["bun services/main-pipeline-creator.ts"],
  enabled: false,
  systemd: {
    restartDelaySeconds: 30,
  },
} as const satisfies WorkstationService
