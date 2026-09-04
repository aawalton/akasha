import type { Domain } from "../../../domains/domain.page-type.ts"

export const inbox = {
  id: "01a06230-b156-7347-be47-6f5960ced389",
  pageTypeSlug: "domain",
  slug: "inbox",
  definition: "the inboxes Alan keeps at empty",
  pluralSlug: "inboxes",
  partSlugs: [
    "module/email-entry-writing",
    "module/inbox-count-polling",
    "module/inbox-count-tick",
    "module/inbox-count-writing",
    "module/inbox-keys",
    "module/inbox-reading",
    "module/inbox-tracking-polling",
    "readout/inboxes-email",
    "readout/inboxes-tasks",
    "workstation-service/inbox-reading-service",
    "workstation-service/inbox-relay-service",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A count is read from the pages the workstation's checkout carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reading is taken by a workstation timer rather than by a pod serving a route.",
    },
    {
      invariantKind: "departure",
      statement: "Every site showing an inbox is carried the count rather than taking one.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      invariantKind: "departure",
      statement: "The tile shows the counts Alan's workstation last took.",
    },
    {
      invariantKind: "constraint",
      statement: "A count nothing can be read for is shown as no signal rather than as a zero.",
    },
    {
      invariantKind: "departure",
      statement: "The game tasks among Alan's inboxes belong to temper rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "Alan's own email rules belong here.",
    },
    {
      invariantKind: "departure",
      statement: "The folder an email rule is in says whose rule it is.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "Needs Him",
      act: "Judge every piece of Alan's mail by whether he has anything to do about it.",
      warrant:
        "Filing what he wanted costs him the thing; showing what he did not need costs a glance.",
      aids: [
        "Show him what he wants to read, not just tasks.",
        "Archive urgent mail that asks nothing of him.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Already Settled",
      act: "Archive mail that only reports something already settled, whoever settled it.",
      warrant: "Reading about a settled thing cannot change it, so the glance buys nothing.",
      aids: [
        "Do not call it settled while it can still fail.",
        "Archive bad news he can no longer change.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Money Goes To Jen",
      act: "Archive every automatic purchase or payment message, and forward Jen what no category rule settles.",
      warrant:
        "Jen manages the money, and a charge a category rule settles already reaches her in Monarch.",
      aids: [
        "Archive refunds and order confirmations too.",
        "A bill still to be paid is not a payment.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Spent Links",
      act: "Archive a sign-in link fifteen minutes after it arrives.",
      warrant:
        "He is already watching for a link he asked for, and it is spent minutes after it lands.",
      aids: ["Send him nothing — it files itself.", "Show him a sign-in link he did not ask for."],
    },
    {
      directiveKind: "rule",
      name: "Ask The Account",
      act: "Archive every account statement and send it nowhere.",
      warrant:
        "Whatever a statement reports is on the account itself, so he reads it there rather than here.",
      aids: [
        "Contributions and royalties are statements too.",
        "Show him a statement that reports a problem.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Jen Runs The Programs",
      act: "Archive mail about the children's church programs, even when it asks for something.",
      warrant:
        "Jen runs them and is sent the mail herself, so a second copy in his inbox buys nothing.",
      aids: [
        "Primary, FSY and youth conference all count.",
        "No church mail outside these programs is covered.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Paid Opinions",
      act: "Archive every offer to pay Alan for his time or his expertise.",
      warrant:
        "He has weighed this class over years and ruled the money not worth the distraction.",
      aids: [
        "Expert networks and paid surveys count too.",
        "A client hiring him is not one of these.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Stop The Source",
      act: "Unsubscribe from marketing mail as well as archiving it.",
      warrant: "Archiving one copy leaves the sender running, so the same mail returns next week.",
      aids: [
        "Digests and launch announcements count too.",
        "Never unsubscribe from a list he chose.",
      ],
    },
    {
      directiveKind: "rule",
      name: "After The Fact",
      act: "Archive every new sign-in and new-device notice.",
      warrant: "The notice arrives after the sign-in, so reading it changes nothing.",
      aids: [
        "Streaming and the children's accounts count too.",
        "Show him a sign-in waiting on his approval.",
      ],
    },
    {
      directiveKind: "rule",
      name: "One Copy",
      act: "Archive a mailing that reached another of his addresses already, whoever it was addressed to.",
      warrant:
        "Every persona address routes to his one mailbox, so a list he joined once arrives many times over.",
      aids: [
        "The first copy through is the one he keeps.",
        "A reply in a thread is not a second copy.",
      ],
    },
  ],
} as const satisfies Domain
