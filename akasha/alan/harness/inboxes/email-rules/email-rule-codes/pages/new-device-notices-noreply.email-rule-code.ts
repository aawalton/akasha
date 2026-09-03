import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const newDeviceNoticesNoreply = {
  id: "01a06860-54a2-7f53-b0c4-9f51af66dec3",
  pageTypeSlug: "email-rule-code",
  slug: "new-device-notices-noreply",
  title: "New device notices noreply",
  matches: [
    {
      field: "from",
      comparison: "is",
      values: [
        "families-noreply@google.com",
        "info@account.netflix.com",
        "no-reply@messaging.peacocktv.com",
        "support@betterment.com",
        "notify@updates.notion.so",
        "no-reply@todoist.com",
        "no-reply@spotify.com",
        "team@ente.io",
        "security@facebookmail.com",
        "notify@mail.notion.so",
        "security-noreply@linkedin.com",
        "security@mail.instagram.com",
        "noreply@steampowered.com",
        "notifications@link.com",
        "no-reply@email.tp-link.com",
        "support@ksl.com",
        "noreply@e.intermountainhealth.org",
        "notifications@vercel.com",
        "disneyplus@trx.mail2.disneyplus.com",
        "team_at_ente_io_b7yaz7z3n7v3t3_w5kx4729@icloud.com",
      ],
    },
    {
      field: "subject",
      comparison: "contains",
      values: ["new device", "new sign-in", "new signin", "new login", "accessed from a new"],
    },
    { field: "from", comparison: "is", values: ["noreply@steampowered.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["thank you for your purchase", "purchase receipt"],
    },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
