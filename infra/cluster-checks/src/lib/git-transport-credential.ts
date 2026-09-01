import { requireEnv } from "@akasha/utils-narrow/require-env"

const GIT_TRANSPORT_HOST = "git-transport.git.svc.cluster.local:3000"

const TOKEN_ENV = "GIT_ACCESS_TOKEN"

export function transportUrl(path: string): string {
  return `http://${GIT_TRANSPORT_HOST}/${path}`
}

export const GIT_CREDENTIAL_ARGS: readonly string[] = [
  "-c",
  `credential.helper=!f() { echo username=x-access-token; echo "password=$${TOKEN_ENV}"; }; f`,
]

export function gitCredentialEnv(): NodeJS.ProcessEnv {
  return {
    ...process.env,
    [TOKEN_ENV]: requireEnv(TOKEN_ENV),
    GIT_TERMINAL_PROMPT: "0",
    GIT_ASKPASS: "",
  }
}
