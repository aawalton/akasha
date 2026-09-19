import type { namedEventKind } from "akasha/story/world/named-events/properties/named-event-kind.select-property.ts"

export type NamedEventKind = (typeof namedEventKind.values)[number]
