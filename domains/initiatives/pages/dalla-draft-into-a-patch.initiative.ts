import type { Initiative } from "../initiative.page-type.types.ts"

export const dallaDraftIntoAPatch = {
  id: "01a05f32-3256-7b26-94ec-82af5035c9bb",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "dalla-draft-into-a-patch",
  domain: "page-type/change",
  persona: "dalla",
  intents: [],
  constraints: [
    "A read hands back the body at HEAD rather than the body the kept edits would leave.",
    "A warrant refuses a draft as it refuses a landing.",
    "A change that will not replay onto HEAD does not apply.",
    "An agent id carries at most one set of kept edits.",
    "The edits an agent keeps are an uncommitted file appended to in place.",
    "A draft is an authored change.",
    "An apply runs the checks and the warrants that any change folded into it runs.",
    "Alan settles each block's shape before it lands.",
    "A mechanical change is landed by a change page rather than by the command that page replaces.",
    "A change page takes no dry run.",
    "The edits a draft keeps are the dry run.",
  ],
} as const satisfies Initiative
