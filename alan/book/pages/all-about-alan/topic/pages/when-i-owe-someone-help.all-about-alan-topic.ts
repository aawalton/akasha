import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whenIOweSomeoneHelp = {
  id: "01a0c59e-5ea6-7a32-830a-8cd865ab1191",
  type: "page-type/all-about-alan-topic",
  slug: "when-i-owe-someone-help",
  title: "When I Owe Someone Help",
  definition: "the threshold that makes preventing a harm obligatory, and what excuses not acting",
  parents: ["all-about-alan-topic/where-doing-and-failing-to-do-differ"],
  settled:
    "I am obligated to prevent a harm where my cost to act is less than my share of the harm prevented, adjusted for uncertainty. That is my answer to the charge that this kind of ethics demands everything of you.\n\nMany others also failed is a genuine partial defence for not acting, by design. It is no defence at all for acting.\n\nSomeone holding a role people rely on, a lifeguard, does something extra when they breach it. They cause a diffuse erosion of trust across everyone who now has to compensate for an unreliable role, and that is a separately attributed cost a bystander with no role never incurs.\n\nKilling an attacker in self-defence offsets a comparable violation against the defender, and the attacker's high authorship for starting it balances the books. Harvesting one person to save five does not: a severe harm at low agency can only be offset by preventing other violations, never by conferring ordinary benefits.",
} as const satisfies AllAboutAlanTopic
