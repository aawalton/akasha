import {
  AKASHA,
  PROXY,
  ROOT_LOCAL,
  SUPERVISOR,
} from "../terminal-entry-points/terminal-entry-points.module.code.ts"
import { implName } from "../terminal-reload/terminal-reload.module.code.ts"

export function supervisorFn(name: string, flags: string): string {
  const cmd = `bun run ${PROXY} -- bun run ${SUPERVISOR}${flags}`
  return `${implName(name)}() {\n  ${ROOT_LOCAL}\n  ${cmd}\n  local _rc=$?\n  tput reset\n  return $_rc\n}`
}

export function claudeNewAccountFn(name: string): string {
  return [
    `${implName(name)}() {`,
    `  ${ROOT_LOCAL}`,
    "  local _acct _email",
    '  read -r -p "New account name (slug, e.g. aow): " _acct',
    `  if [ -z "$_acct" ]; then echo "${name}: aborted — no account name"; return 1; fi`,
    '  read -r -p "Email for $_acct: " _email',
    `  if [ -z "$_email" ]; then echo "${name}: aborted — no email"; return 1; fi`,
    `  ${AKASHA} claude-account-add "$_acct" --email "$_email" || { echo "${name}: claude-account-add failed"; return 1; }`,
    '  echo "Launching login session for $_acct — run /login and authenticate as $_email."',
    `  bun run ${PROXY} -- bun run ${SUPERVISOR} -a "$_acct"`,
    "  local _rc=$?",
    "  tput reset",
    `  echo "Run 's.' to load the new c-alias for $_acct."`,
    "  return $_rc",
    "}",
  ].join("\n")
}
