import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatPressureAndResistanceLookLike = {
  id: "01a0c5ef-7a35-7e49-9d01-8e6e296b3063",
  type: "page-type/all-about-alan-topic",
  slug: "what-pressure-and-resistance-look-like",
  title: "What Pressure And Resistance Look Like",
  definition: "the tests I watch an organisation under, and the behaviours that count as passing",
  parents: ["all-about-alan-topic/which-organisations-i-trust"],
  related: [
    "all-about-alan-topic/when-a-company-changes-hands",
    "all-about-alan-topic/how-i-grade-an-organisation",
  ],
  settled:
    "Pressure is the test, so I have to recognise it. An ownership change: acquisition, flotation, going private, a founder leaving, succession. Activist investors. Competitors disappearing. A recession, a supply shock, a regulatory change. A cycle where the economy rewards scale by extraction over scale by service.\n\nResisting one is evidence. Resisting several at once is strong evidence.\n\nWhat counts as resisting: holding price where rivals shrink the product or creep the fees. Paying workers above market while peers squeeze. Keeping quality when rivals swap in cheaper inputs. Keeping the return and support policies that favour the customer. Refusing to monetise customer data, attention or loyalty. Saying no to growth that would abandon the model.\n\nDecades without a pressure test prove nothing, and strong recent resistance without decades is suggestive and not yet sufficient.",
} as const satisfies AllAboutAlanTopic
