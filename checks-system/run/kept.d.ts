import type { BuildContext } from "../../graph/build-context/build-context.ts";
import type { Check, CheckRun, Tree } from "../check/check-shape.ts";
export type Subject = {
    readonly at: string;
    readonly oid: string;
};
export type Setting = {
    readonly before: Tree | null;
    readonly trial: boolean;
    readonly oids: ReadonlyMap<string, string>;
    readonly ctx: BuildContext;
};
export declare function forgetRetired(answers: string, registry: readonly Check[]): void;
export declare function runKept(check: Check, subjects: readonly Subject[], runtime: string, answers: string, tree: Tree, setting: Setting): CheckRun;
