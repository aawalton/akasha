export type EmailOperations = typeof import("../gmail-messages/gmail-messages.module.code.ts") &
  typeof import("../gmail-drafts/gmail-drafts.module.code.ts") &
  typeof import("../gmail-attachments/gmail-attachments.module.code.ts") &
  typeof import("../gmail-client/gmail-client.module.code.ts") &
  typeof import("../gmail-credentials/gmail-credentials.module.code.ts") &
  typeof import("../gmail-schema/gmail-schema.module.code.ts") &
  typeof import("../list-unsubscribe/list-unsubscribe.module.code.ts")

export async function emailGoogle(): Promise<EmailOperations> {
  const parts = await Promise.all([
    import("../gmail-messages/gmail-messages.module.code.ts"),
    import("../gmail-drafts/gmail-drafts.module.code.ts"),
    import("../gmail-attachments/gmail-attachments.module.code.ts"),
    import("../gmail-client/gmail-client.module.code.ts"),
    import("../gmail-credentials/gmail-credentials.module.code.ts"),
    import("../gmail-schema/gmail-schema.module.code.ts"),
    import("../list-unsubscribe/list-unsubscribe.module.code.ts"),
  ])
  return Object.assign({}, ...parts) as EmailOperations
}
