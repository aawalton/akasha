import type { Attribute } from "akasha/agents/modules/attributes/agent-attributes.module.code.ts"

export function attributeFor(slug: string): Attribute {
  return { slug }
}
