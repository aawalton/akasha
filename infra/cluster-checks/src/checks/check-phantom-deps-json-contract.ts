import { z } from "zod"

export const PhantomDepViolationContractSchema = z
  .object({
    workspace: z.string(),
    importedPackage: z.string(),
    file: z.string(),
    imported: z.enum(["workspace", "external"]),
    declaredAs: z.array(z.string()),
  })
  .strict()

export type PhantomDepViolation = z.infer<typeof PhantomDepViolationContractSchema>
