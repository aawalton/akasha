import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatEachHourOfRecoveryPaysBack = {
  id: "01a0c5eb-c480-7e46-a4b9-0d461878d78d",
  type: "page-type/all-about-alan-topic",
  slug: "what-each-hour-of-recovery-pays-back",
  title: "What Each Hour Of Recovery Pays Back",
  definition: "the stress-capacity hours one hour of each thing in my recovery stack restores",
  parents: ["all-about-alan-topic/what-calms-me-down"],
  related: [
    "all-about-alan-topic/how-i-actually-breathe",
    "all-about-alan-topic/what-a-hot-bath-actually-does",
    "all-about-alan-topic/what-the-pod-does-to-the-price",
    "all-about-alan-topic/the-arithmetic-of-the-decline",
  ],
  settled:
    "Deep meditative breathing, four counts in and twelve out timed to my heartbeat, pays back one stress-capacity hour per hour. Counted by breath, two hundred breaths is one stress-capacity hour. It is my primary way of paying stress-capacity cost.\n\nRest pays back one hour per hour. Sleep pays back one hour per hour, and a wake in the middle of a cycle does not fragment the rate.\n\nA bath hot enough to sweat pays back three hours per hour. The Nuropod pays back three hours per hour.\n\nWhich way my capacity compounds is set by the sign of recovery rate less stressor rate. Before the diagnosis I ran a deficit of about half for eighteen years, stressors at about one and a half times recovery, even with four to twelve hours a day of breathing on top. Sixteen months of surplus since has grown it about five times, from about one percent to about five.\n\nRemoving my baseline overstimulation moved me from deficit to surplus by lowering the stressor rate rather than by adding recovery.",
} as const satisfies AllAboutAlanTopic
