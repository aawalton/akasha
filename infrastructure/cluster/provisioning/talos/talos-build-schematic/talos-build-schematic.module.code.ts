import { createHash } from "node:crypto"
import { stringify } from "yaml"
import type { ImageFactorySchematic, NodeIntent } from "../talos-schema/talos-schema.module.code.ts"

export function buildSchematic(node: NodeIntent): ImageFactorySchematic {
  return {
    customization: {
      systemExtensions: {
        officialExtensions: [...node.extensions],
      },
      ...(node.extraKernelArgs.length > 0 && {
        extraKernelArgs: [...node.extraKernelArgs],
      }),
    },
  }
}

export function schematicId(schematic: ImageFactorySchematic): string {
  return createHash("sha256").update(canonicalSchematicYaml(schematic)).digest("hex")
}

function canonicalSchematicYaml(schematic: ImageFactorySchematic): string {
  const { systemExtensions, extraKernelArgs } = schematic.customization
  return stringify(
    {
      customization: {
        ...(extraKernelArgs !== undefined &&
          extraKernelArgs.length > 0 && { extraKernelArgs: [...extraKernelArgs] }),
        systemExtensions: { officialExtensions: [...systemExtensions.officialExtensions] },
      },
    },
    { indent: 4 }
  )
}
