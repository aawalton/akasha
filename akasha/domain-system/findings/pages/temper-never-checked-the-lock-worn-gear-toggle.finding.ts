import type { Finding } from "../finding.page-type.ts"

export const temperNeverCheckedTheLockWornGearToggle = {
  id: "01a06040-17a1-7015-910a-bc14279efa78",
  pageTypeSlug: "finding",
  slug: "temper-never-checked-the-lock-worn-gear-toggle",
  domainSlug: "domain/temper",
  claim:
    "Temper's reader of automation settings listed 29 of the 30 character toggles and left `lockWornGear` out, so anything at all could be written under that key and the reader took it. The recreation ties the field list to the toggle names by type, which closes the hole, and `lockWornGear` set to something other than a boolean is now refused where it used to be taken.",
  evidence:
    "`tools/lib/temper-inventory/automation-types.ts` declared `lockWornGear?: boolean` as the first field of `CharacterAutomationToggles`, and `automation-set.ts` carried `lockWornGear` in `CHARACTER_TOGGLE_NAMES`, so both the type and the toggle the command sets knew the key.\n\n`automation-settings-schema.ts` did not. Its `CharacterTogglesSchema` opened at `equipment` and ran to `masterWritProvisioning` — 29 fields, no `lockWornGear`. The object closed with `.passthrough()`, so the missing field was not refused; it was carried through unchecked.\n\nThe annotation `z.ZodType<CharacterAutomationToggles>` did not catch it. Every field of that type is optional, so an object shape missing one of them still satisfies the annotation. The three files could drift and nothing said so.\n\nThe recreation writes the fields as `satisfies Record<CharacterToggleName, z.ZodOptional<z.ZodBoolean>>`, where `CharacterToggleName` comes from the one list of names. A field missing from the object is a type error, and so is a field no name matches. The same drift cannot happen again without the build saying so.\n\nHow long the hole was open is not known, and whether any settings written in that time carry a bad `lockWornGear` has not been checked.",
} as const satisfies Finding
