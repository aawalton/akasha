import { z } from "zod"

export const addonManifestSchema = z
  .object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    author: z.string(),
    version: z.string(),
    addonVersion: z.number(),
    apiVersion: z.array(z.string()).optional(),
    savedVariables: z.array(z.string()),
    dependsOn: z.array(z.string()),
    optionalDependsOn: z.array(z.string()).optional(),
    additionalLuaFiles: z.array(z.string()).optional(),
    assets: z.array(z.string()).optional(),
    siblingAddons: z.array(z.string()).optional(),
    xmlFiles: z
      .object({
        beforeBundle: z.array(z.string()).optional(),
        afterBundle: z.array(z.string()).optional(),
      })
      .optional(),
  })
  .passthrough()

export type AddonManifest = z.infer<typeof addonManifestSchema>
