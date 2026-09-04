import type { Finding } from "../finding.page-type.ts"

export const aRemovalLandedThreeCommitsBeforeTheListsThatNamedIt = {
  id: "01a06224-a9c9-7bb9-82e0-44f1d426aa7c",
  pageTypeSlug: "finding",
  slug: "a-removal-landed-three-commits-before-the-lists-that-named-it",
  domainSlug: "page-type/ios-component",
  claim:
    "Over 843f0c91f4..00b181666b, three commits on main named two iOS components whose files had already gone, so the alanwalton widget extension could not have built across that span. The only guard against a component named and missing runs on a Mac at build time, so a lane bisecting that range meets a Swift failure with nothing local to explain it.",
  evidence:
    "`akasha remove` took akasha/code-system/ios-component/ios-components/alanwalton-values-stoplights-widget and its persona twin at 843f0c91f4. Three registrations still named them: partSlugs in ios-component.page-type.ts, and componentSlugs on both alanwalton-widget.ios-program.ts and alanwalton-decode-harness.ios-program.ts. Those closed at 0def767ef4 and 00b181666b.\n\nWhat would catch it is widget-components.shell-script.shell.sh:26-29, which refuses where the ios-app page names a component and no file is there: 'A component named and missing is a build that would fail later with an undefined symbol.' That runs on the Mac during an ios-app build, never in this checkout. The remove at 843f0c91f4 ran no check of its own — it reported that a `change-mechanical` change is judged by none.\n\nThe index did report it, but only on the writes that mended it. 0def767ef4 and 00b181666b each printed 'the index took less than the whole of this — no `ios-component` carries the slug `alanwalton-persona-stoplights-widget`'. That notice arrives on the write repairing the reference and never on the one breaking it, so the order it is emitted in is the reverse of the order it would be useful in.\n\nThe order that avoids the window: name the registrations and the component folders in one call. Both `akasha remove` and `akasha edit` take several paths and land them as one commit, so nothing forced the split — it was mine.",
} as const satisfies Finding
