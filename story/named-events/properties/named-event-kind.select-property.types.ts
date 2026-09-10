import type { namedEventKind } from "./named-event-kind.select-property.ts"

export type NamedEventKind = (typeof namedEventKind.values)[number]
