export type EmailOperations =
  typeof import("akasha/alan/google/email/modules/gmail-messages/gmail-messages.module.code.ts") &
    typeof import("akasha/alan/google/email/modules/gmail-drafts/gmail-drafts.module.code.ts") &
    typeof import("akasha/alan/google/email/modules/gmail-attachments/gmail-attachments.module.code.ts") &
    typeof import("akasha/alan/google/email/modules/gmail-client/gmail-client.module.code.ts") &
    typeof import("akasha/alan/google/email/modules/gmail-credentials/gmail-credentials.module.code.ts") &
    typeof import("akasha/alan/google/email/modules/gmail-schema/gmail-schema.module.code.ts") &
    typeof import("akasha/alan/google/email/modules/list-unsubscribe/list-unsubscribe.module.code.ts")

export async function emailGoogle(): Promise<EmailOperations> {
  const parts = await Promise.all([
    import("akasha/alan/google/email/modules/gmail-messages/gmail-messages.module.code.ts"),
    import("akasha/alan/google/email/modules/gmail-drafts/gmail-drafts.module.code.ts"),
    import("akasha/alan/google/email/modules/gmail-attachments/gmail-attachments.module.code.ts"),
    import("akasha/alan/google/email/modules/gmail-client/gmail-client.module.code.ts"),
    import("akasha/alan/google/email/modules/gmail-credentials/gmail-credentials.module.code.ts"),
    import("akasha/alan/google/email/modules/gmail-schema/gmail-schema.module.code.ts"),
    import("akasha/alan/google/email/modules/list-unsubscribe/list-unsubscribe.module.code.ts"),
  ])
  return Object.assign({}, ...parts) as EmailOperations
}
