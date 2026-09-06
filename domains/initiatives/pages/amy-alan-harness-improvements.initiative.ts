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
        "`pages/file-body/page-file-body.module.code.ts` reads every file property with readFileSync(path, 'utf8'), so a PNG loses its leading byte to U+FFFD and cannot be recovered. Alan settled that a page property states whether the files that property holds are bytes, as an optional flag beside `machine-written` and `runs-file-length`.",
    },
    {
      statement: "The pages service answers a file property's bytes unchanged.",
      workingMemory:
        "The `/read` endpoint decodes through TextDecoder as well, so both roads corrupt. The cluster's page-store is a socat forwarder carrying a pod's request out to the workstation, so a pod already reaches the live checkout; what is missing is a byte-safe answer rather than a road to the files. Two findings say the page store is already over-exposed, so the new answer is narrow.",
    },
    {
      statement: "The route serving Alan's phone reads the persona's mobile wallpaper.",
      workingMemory:
        "`mobileWallpaper` is declared and landed. Forty cover pictures are staged outside the checkout at /tmp/amy-tw-f5a66efa/covers, 47 MB, every one checked as a PNG; nova's was a JPEG under a .png key and was drawn again as a PNG. The pictures wait on a byte-safe reader before landing, so that no history is kept for a road that does not work.",
    },
  ],
} as const satisfies Initiative
