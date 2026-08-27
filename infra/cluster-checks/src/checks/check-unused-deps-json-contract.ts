import { z } from "zod"
import type { Finding } from "./check-unused-deps-types.ts"

export const UnusedDepsFindingContractSchema: z.ZodType<Finding> = z
  .object({
    workspace: z.string(),
    workspaceRoot: z.string(),
    dep: z.string(),
    depType: z.union([z.literal("dependencies"), z.literal("devDependencies")]),
    reason: z.string(),
  })
  .strict()
