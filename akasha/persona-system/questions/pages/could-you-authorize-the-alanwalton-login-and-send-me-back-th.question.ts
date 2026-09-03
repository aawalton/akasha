import type { Question } from "../question.page-type.ts"

export const couldYouAuthorizeTheAlanwaltonLoginAndSendMeBackTh = {
  id: "01a00a7e-456f-75a9-bef4-7983f614d099",
  pageTypeSlug: "question",
  slug: "could-you-authorize-the-alanwalton-login-and-send-me-back-th",
  ask: "Could you authorize the alanwalton login and send me back the code#state? I have the login waiting on it.",
  askedBy: "athena",
  askedIn: "01a00a7c-af39-74c5-9326-43e7c0ec7298",
  status: "answered",
  answer: "Already done",
  closedAt: "2026-08-16T20:14:08.266Z",
  context: "txt",
  links: [
    {
      label: "Authorize alanwalton",
      target:
        "https://claude.com/cai/oauth/authorize?code=true&client_id=9d1c250a-e61b-44d9-88ed-5944d1962f5e&response_type=code&redirect_uri=https%3A%2F%2Fplatform.claude.com%2Foauth%2Fcode%2Fcallback&scope=org%3Acreate_api_key+user%3Aprofile+user%3Ainference+user%3Asessions%3Aclaude_code+user%3Amcp_servers+user%3Afile_upload&code_challenge=f8sDTvwgDWgYl8inrNSt5JZEYpSIT4QEa-FvVf7GLms&code_challenge_method=S256&state=UcsrRRNpHmQ94iOQeHLm6WeF7rPxz7KmTq2JBoL7l8I",
      platform: "web",
    },
  ],
} as const satisfies Question
