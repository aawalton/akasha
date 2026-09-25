import type { Slide } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/slide.page-type.types.ts"

export const autcon2026ResourceBars = {
  id: "01a0d624-9333-7374-9bdd-85e5bd360b33",
  type: "page-type/slide",
  slug: "autcon-2026-resource-bars",
  title: "Level 3: Resource Bars",
  deck: "site-document/audhdalan-web-autcon-2026",
  number: 5,
  kind: "level",
  lead: "Absolute anchors, measured results",
  points: [
    {
      title: "Health",
      description: "stress capacity = tolerance for allostatic load",
      color: "red",
      fill: 0.7,
    },
    {
      title: "Mana",
      description: "executive function = energy and neurotransmitter supplies in your brain",
      color: "blue",
      fill: 0.55,
    },
    {
      title: "Stamina",
      description: "physical energy = energy supplies in your body",
      color: "green",
      fill: 0.8,
    },
  ],
} as const satisfies Slide
