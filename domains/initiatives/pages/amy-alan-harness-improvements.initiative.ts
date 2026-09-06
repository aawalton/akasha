import type { Initiative } from "../initiative.page-type.ts"

export const amyAlanHarnessImprovements = {
  id: "01a07679-5492-7992-ab84-cc889f134678",
  pageTypeSlug: "initiative",
  slug: "amy-alan-harness-improvements",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  intents: [
    {
      statement: "The persona Alan messaged most recently is tracked reliably in the code editor.",
    },
    {
      statement: "Alan's desktop wallpaper shows the persona he messaged most recently.",
    },
    {
      statement: "Alan's mobile wallpaper shows the persona he messaged most recently.",
    },
    {
      statement:
        "`akasha measure attributes` answers each attribute's total level, floored to two decimals.",
      workingMemory:
        "The figures are the computed properties the total level of each attribute is worked out from, floored rather than rounded to two decimal places.",
    },
    {
      statement: "Every persona has a desktop wallpaper.",
      workingMemory:
        "Alan takes a persona's desktop wallpaper to belong on the persona as a file property, so the route delivering a desktop wallpaper reads that file property rather than resolving a cover image.",
    },
    {
      statement: "Every persona has a mobile wallpaper.",
      workingMemory:
        "Alan takes a persona's mobile wallpaper to belong on the persona as a file property, so the route delivering a mobile wallpaper reads that file property rather than resolving a cover image.",
    },
    {
      statement: "A file property holds bytes as well as text.",
      workingMemory:
        "Met. `bytesAt` reads the bytes before any decoding is chosen, `bodyAt` decodes those bytes for text, and `holds-bytes` is the optional flag beside `machine-written` and `runs-file-length`. Twelve tests pass, two of them a picture read back byte for byte and the same picture losing its leading byte down the text road. A picture also survives `akasha write`, the working tree and git unchanged.",
    },
    {
      statement: "The pages service answers a file property's bytes unchanged.",
      workingMemory:
        "The `/read` endpoint decodes through TextDecoder as well, so both roads corrupt. The cluster's page-store is a socat forwarder carrying a pod's request out to the workstation, so a pod already reaches the live checkout; what is missing is a byte-safe answer rather than a road to the files. Two findings say the page store is already over-exposed, so the new answer is narrow.",
    },
    {
      statement: "The route serving Alan's phone reads the persona's mobile wallpaper.",
      workingMemory:
        "Amy carries a picture beside her page. Forty are staged outside the checkout at /tmp/amy-tw-f5a66efa/covers, 47 MB; nova's was a JPEG under a name ending png and was drawn again as a PNG. The check looking for a global read every changed path as text and now reads only the code that check takes as input. What is left is the road from the pod: `api.wallpaper.ts` asks for keys, and a key names the ending rather than the picture.",
    },
  ],
} as const satisfies Initiative
