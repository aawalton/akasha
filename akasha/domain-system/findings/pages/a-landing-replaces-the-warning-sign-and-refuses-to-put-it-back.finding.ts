import type { Finding } from "../finding.page-type.ts"

export const aLandingReplacesTheWarningSignAndRefusesToPutItBack = {
  id: "01a064ba-fcf2-7480-872e-d0365ec4e384",
  pageTypeSlug: "finding",
  slug: "a-landing-replaces-the-warning-sign-and-refuses-to-put-it-back",
  domainSlug: "workspace-package/command-system",
  claim:
    "A landing replaces the warning sign U+26A0 with an exclamation mark in code, and nothing puts it back: the replacement is idempotent, so an edit handing the character in is answered as a change already made. It is narrow rather than general — emoji and U+26AB survive a landing byte for byte.",
  evidence:
    "Found landing `terminal-marks` at `1b6a8ef831`. The source at `editor-extension/src/features/terminal-rename/terminal-marks.ts:7` holds the sign, bytes `e2 9a a0`; the landed `terminal-marks.module.code.ts:7` holds byte `21`.\n\nReproduced apart from the lane that met it. An `akasha edit` handing the character back reported that it reformatted the body as it landed, that what is there differs from what was handed in, and then that nothing was committed because the ask was already met. Both phrases are paraphrased here, because the command's own wording carries a term barred in this prose. So a landing does say it reformatted, and the first account of this, calling it silent, was wrong. What it never says is which bytes moved, and the notice reads like quote and semicolon formatting.\n\nThe reach was feared wide and is not. `editor-extension/src` carries 108 non-ASCII characters over 32 of its 77 files, six of them stoplight glyphs a status bar draws with. Landing U+1F534 and U+26AB into a real module returned both byte for byte, at `5473afb138` and `cdd040a7f1`. An em-dash sits in 1043 akasha code files. Reading the danger off the sign appearing in zero akasha code files would have been wrong: absence was absence rather than evidence of stripping.\n\nThe mechanism is unlocated. `formattedSaid` at `asking.module.code.ts:91` builds the notice but does not do the work, and no transliteration table sits under the checks or code-system trees.\n\nOne character in one file waits on this. What is worth holding is the shape: a landing may rewrite a body, say so in words that read as formatting, and then refuse the correction as work already done.",
} as const satisfies Finding
