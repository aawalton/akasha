import { seatSectionOf } from "akasha/agent/seat/fleet/modules/seat-section/seat-section.computed-property-module.code.ts"
import type { SeatSection } from "akasha/agent/seat/properties/seat-section.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

type Placed = { readonly role?: string; readonly assignmentSlug?: string }

export const work: Work<Placed, SeatSection> = (page) =>
  seatSectionOf(page.role ?? null, page.assignmentSlug ?? null)
