import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberTemperAlpha = {
  id: "01a0de4d-ccf3-7cab-a8bf-2cae7c1c6bd9",
  type: "page-type/initiative",
  slug: "ember-temper-alpha",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "A player besides Alan plays with the Temper addons.",
      workingMemory:
        "The zip at https://tempereso.com/api/addons/download needs no sign-in and no addon outside it. Sign-up is Google-only through alanwalton.com, and no fresh Google account has tried it. The first alpha user is Joseph (person/joseph). On 2026-10-08 Alan's Gmail sent Joseph the link and the setup steps, in thread 1a11bc3bb554e54e. Left is Joseph installing the addons and playing with them.",
    },
  ],
  constraints: [
    "The interface of Pithka's Achievement Tracker in Temper is identical to the upstream interface.",
    "The fight report of Combat Metrics in Temper is identical to the upstream fight report.",
  ],
  updatedAt: "2026-10-08T15:07:24.987Z",
} as const satisfies Initiative
