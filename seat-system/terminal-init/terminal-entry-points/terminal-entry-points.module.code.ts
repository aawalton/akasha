import {
  PTY_PROXY_REL,
  SEAT_RESUME_REL,
  SUPERVISOR_REL,
} from "../../seat-launching/seat-launching.module.code.ts"

export const ROOT = "${AKASHA_ROOT:-$HOME/repos/akasha}"

export const ROOT_LOCAL = `local _root="${ROOT}"`

export const SUPERVISOR = `"$_root/${SUPERVISOR_REL}"`

export const PROXY = `"$_root/${PTY_PROXY_REL}"`

export const SEAT_START_DIR = "$HOME/repos"

export const SEAT_RESUME = `"$_root/${SEAT_RESUME_REL}"`

export const AKASHA = `"${ROOT}/dotfiles/bin/akasha"`
