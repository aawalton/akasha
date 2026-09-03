import type { HelpEnvVar, HelpFlag } from "@akasha/command-system/command-declaring"

export const GMAIL_ENV_VARS: readonly HelpEnvVar[] = [
  {
    name: "GOOGLE_GMAIL_OAUTH_CLIENT_ID",
    required: true,
    description: "OAuth client ID (Desktop-app credential)",
  },
  {
    name: "GOOGLE_GMAIL_OAUTH_CLIENT_SECRET",
    required: true,
    description: "OAuth client secret",
  },
  {
    name: "GOOGLE_GMAIL_OAUTH_REFRESH_TOKEN",
    required: true,
    description: "Refresh token minted by `ops email auth login`",
  },
]

export const COMPOSE_FLAGS: readonly HelpFlag[] = [
  {
    name: "--to",
    argLabel: "<addr,..>",
    valueShape: "token",
    required: true,
    repeat: true,
    description: "Recipient addresses (comma-separated values accepted)",
  },
  {
    name: "--cc",
    argLabel: "<addr,..>",
    valueShape: "token",
    repeat: true,
    description: "Cc recipients (comma-separated values accepted)",
  },
  {
    name: "--bcc",
    argLabel: "<addr,..>",
    valueShape: "token",
    repeat: true,
    description: "Bcc recipients (comma-separated values accepted)",
  },
  {
    name: "--subject",
    argLabel: "<text>",
    valueShape: "prose",
    required: true,
    description: "Subject line",
  },
  {
    name: "--body",
    argLabel: "<text>",
    valueShape: "prose",
    required: true,
    description: "Plain-text message body",
  },
  {
    name: "--attach",
    argLabel: "<path>",
    valueShape: "token",
    repeat: true,
    path: true,
    description:
      "Local file to attach; each path becomes one multipart/mixed part, filename from the basename and content type from the extension",
  },
  {
    name: "--thread",
    argLabel: "<id>",
    valueShape: "token",
    description: "Thread to attach the message to (reply threading)",
  },
  {
    name: "--reply-to-message",
    argLabel: "<id>",
    valueShape: "token",
    description: "Message whose Message-ID seeds the In-Reply-To/References headers",
  },
  {
    name: "--from",
    argLabel: '<"Name <addr>">',
    valueShape: "token",
    description:
      'Sender identity for a verified "Send mail as" alias (e.g. "Amy <amy@alanwalton.com>"); omit to send as the authenticated account',
  },
]
