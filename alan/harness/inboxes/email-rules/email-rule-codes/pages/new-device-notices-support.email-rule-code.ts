import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const newDeviceNoticesSupport = {
  id: "01a06860-54a2-7a60-843a-096b18555b10",
  pageTypeSlug: "email-rule-code",
  slug: "new-device-notices-support",
  title: "New device notices support",
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
    { field: "from", comparison: "is", values: ["support@betterment.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["statement"] },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
