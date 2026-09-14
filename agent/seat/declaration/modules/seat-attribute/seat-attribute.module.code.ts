import type { Attribute } from "akasha/agent/modules/attributes/agent-attributes.module.code.ts"

export function attributeFor(slug: string): Attribute {
  return { slug }
}
